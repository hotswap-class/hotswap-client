import * as jsonfile from 'jsonfile';
import * as jquery from 'jquery';
import * as notifier from 'node-notifier';
import * as fse from 'fs-extra';
import * as request from 'request';
import * as zipper from 'zip-local';
import * as fs from 'fs';
// import * as io from 'socket.io';

class Updater {
    private appVersion: number;
    private socket;
    constructor() {
        this.appVersion = jsonfile.readFileSync(__dirname + '/../version.json').version;
        this.registerForUpdates();
    }

    private registerForUpdates(){
        // this.socket = io('http://localhost:3000');
        
    }

    public checkForUpdates() {
        let that = this;
        jquery.get("http://localhost:3000/version", function (data) {
            if (data.version > that.appVersion) {
                // $(".hidden").removeClass("hidden");
                notifier.notify({
                    'title': 'Update available',
                    'message': 'Hold tight, your application will be updated soon',
                    wait: false
                });
                that.applyUpdates(data.version);
            } else {
                // notifier.notify({
                //     'title': 'You have latest updates installed',
                //     'message': 'We will notify you again, when we roll in next update',
                //     wait: false
                // });
                console.log("no updates available");
            }
        });
    }

    private applyUpdates(updatedAppVersion) {
        fse.emptyDir('updates', function (err) {
            request("http://localhost:3000/update/app.zip").pipe(fs.createWriteStream("updates/updated.zip")).on("close", function () {
                zipper.sync.unzip("updates/updated.zip").save("updates");
                fs.unlink("updates/updated.zip");
                fse.emptyDir('dist/app', function (err) {
                    fse.copy('updates', 'dist/app', {
                        clobber: true
                    }, function (err) {
                        if (err) return console.error(err)
                        console.log("success!");
                        jsonfile.writeFileSync(__dirname + '/../version.json', {
                            version: updatedAppVersion
                        });
                        location.reload();
                    });
                });
            });
        });
    }
}