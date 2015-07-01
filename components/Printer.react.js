/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');

var IG_ID      = '5d025e2a51964f76a94af8f507e638b2',
    IG_SECRET  = '0d59dda4f664453486fa042637af91b0',
    IG_SUB_URL = 'https://api.instagram.com/v1/subscriptions/';

module.exports = WeddingPrinter = React.createClass({

    getInitialState: function() {
        return {
            imgSrc: ''
        }
    },

    componentDidMount: function() {
        var url = 'https://api.instagram.com/v1/tags/corgie/media/recent?client_id=5d025e2a51964f76a94af8f507e638b2';

        var handler = function(result) {
            var lastGist = result;
            if (this.isMounted()) {
                this.setState({
                    imgSrc: lastGist.data[0].images.standard_resolution.url
                });
            }
        }.bind(this);

        $.ajax({
            url: url,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: handler,
            error: function() { alert('Failed!'); }
        });
    },

    subClickHandler: function() {
        console.log('attempting subscribe');

        var data = {
            client_id: IG_ID,
            client_secret: IG_SECRET,
            object: 'tag',
            object_id: 'nofilter',
            verify_token: 'weddingprinter',
            callback_url: 'http://weddingprinter-krapspark.rhcloud.com/sub'
        };

        var handler = function(data) {
            console.log('sub success?' + data);
        };

        $.ajax({
            url: IG_SUB_URL,
            method: 'POST',
            crossDomain: true,
            data: data,
            dataType: 'json',
            success: handler,
            error: function() { alert('Failed!'); }
        });
    },

    // Render the component
    render: function(){
        return (
            <div className="printer-app">
                <span>hmmm</span>
                <img src={this.state.imgSrc} />
                <button onClick={this.subClickHandler}>Subscribe</button>
            </div>
        )
    }
});
