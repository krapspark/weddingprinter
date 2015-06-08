/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');

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

    // Render the component
    render: function(){
        return (
            <div className="printer-app">
                <span>hello</span>
                <img src={this.state.imgSrc} />
            </div>
        )

    }
});
