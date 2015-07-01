var JSX = require('node-jsx').install(),
    PrinterApp = require('./components/Printer.react'),
    React = require('react');

module.exports = {
    index: function(req, res) {
        // Render our 'home' template
        res.render('home', {
            markup: React.renderComponentToString(PrinterApp())
        });
    },
    sub: function(req, res) {
    },
    pub: function(req, res) {
    }
}
