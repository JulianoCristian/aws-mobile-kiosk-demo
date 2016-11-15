import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { LockerService } from './locker.service';
import { ShapeOptions, CircleProgressComponent } from 'angular2-progressbar';

const devices = {
    starterKit: 'AT&T IOT\nstarter kit',
    fireStick: 'Amazon\nFireStick',
    echoDot: 'Amazon Echo\nDot',
};

@Component({
    selector: 'inventory',
    templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit, OnChanges {
    @ViewChild(CircleProgressComponent) circleComp: CircleProgressComponent;
    @Input() deviceKey: string;
    private deviceName: string;
    private deviceList: Object;
    private oldDeviceList: Object = {};
    private childViewLoaded: boolean = false;
    private circleOptions: ShapeOptions = {
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        duration: 1400,
        text: {
            autoStyleContainer: false,
        },
        easing: 'bounce',
        strokeWidth: 6,
        from: { color: '#FFEA82', a: 0 },
        to: { color: '#ED6A5A', a: 1 },
        // Set default step function for all animate calls
        step: function(state: any, circle: any) {
            circle.path.setAttribute('stroke', state.color);
            circle.setText(Math.round(circle.value()));
        }
    };

    constructor(private lockerService: LockerService) { }
    ngOnInit(): void {
        this.deviceName = devices[this.deviceKey];
        this.deviceList = this.lockerService.deviceList;
        /*
        setInterval(() => {
            this.circleComp.animate(this.deviceList[this.deviceKey]);
        }, 5000);
       */
    }

    ngOnChanges(changes) { }

    ngDoCheck() {
        if (!this.childViewLoaded) {
            return;
        }
        if (this.oldDeviceList[this.deviceKey] !== this.deviceList[this.deviceKey]) {
            this.circleComp.animate(this.deviceList[this.deviceKey]);
            this.oldDeviceList[this.deviceKey] = this.deviceList[this.deviceKey];
        }
    }

    ngAfterViewInit() {
        this.childViewLoaded = true;
    }
}
