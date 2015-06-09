var gui = require('nw.gui');

var win = gui.Window.get();
var menubar = new gui.Menu({
    type: 'menubar'
});

var connect = new gui.Menu();
var about = new gui.Menu();

connect.append(new gui.MenuItem({
    label: 'Open SSH Connection',
    click: function() {
    }
}));

about.append(new gui.MenuItem({
    label: 'Open Documentation',
    click: function() {
        gui.Window.open('../README.htm');
    }
}));

about.append(new gui.MenuItem({
    label: 'BeagleBoard TV',
    click: function() {
        gui.Window.open('https://www.youtube.com/user/jadonk');
    }
}));

about.append(new gui.MenuItem({
    label: 'About',
    click: function() {
        alert('BeagleBoard Getting Started App\n(c) 2015 Ariane Paola Gomes.');
    }
}));

menubar.append(new gui.MenuItem({label: 'Connect', submenu: connect}));
menubar.append(new gui.MenuItem({label: 'Help', submenu: about}));

win.menu = menubar;