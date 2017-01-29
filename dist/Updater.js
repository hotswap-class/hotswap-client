"use strict";
var jsonfile = require("jsonfile");
var jquery = require("jquery");
var notifier = require("node-notifier");
var fse = require("fs-extra");
var request = require("request");
var zipper = require("zip-local");
var fs = require("fs");
// import * as io from 'socket.io';
var Updater = (function () {
    function Updater() {
        this.appVersion = jsonfile.readFileSync(__dirname + '/../version.json').version;
        this.registerForUpdates();
    }
    Updater.prototype.registerForUpdates = function () {
        // this.socket = io('http://localhost:3000');
    };
    Updater.prototype.checkForUpdates = function () {
        var that = this;
        jquery.get("http://localhost:3000/version", function (data) {
            if (data.version > that.appVersion) {
                // $(".hidden").removeClass("hidden");
                notifier.notify({
                    'title': 'Update available',
                    'message': 'Hold tight, your application will be updated soon',
                    wait: false
                });
                that.applyUpdates(data.version);
            }
            else {
                // notifier.notify({
                //     'title': 'You have latest updates installed',
                //     'message': 'We will notify you again, when we roll in next update',
                //     wait: false
                // });
                console.log("no updates available");
            }
        });
    };
    Updater.prototype.applyUpdates = function (updatedAppVersion) {
        fse.emptyDir('updates', function (err) {
            request("http://localhost:3000/update/app.zip").pipe(fs.createWriteStream("updates/updated.zip")).on("close", function () {
                zipper.sync.unzip("updates/updated.zip").save("updates");
                fs.unlink("updates/updated.zip");
                fse.emptyDir('dist/app', function (err) {
                    fse.copy('updates', 'dist/app', {
                        clobber: true
                    }, function (err) {
                        if (err)
                            return console.error(err);
                        console.log("success!");
                        jsonfile.writeFileSync(__dirname + '/../version.json', {
                            version: updatedAppVersion
                        });
                        location.reload();
                    });
                });
            });
        });
    };
    return Updater;
}());
