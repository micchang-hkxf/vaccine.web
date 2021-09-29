<template>

    <div class="timepicker-container">
        <div class="timepicker-wrap">
            <img src="/images/time_picker_icon.svg" class="timepicker-icon timepicker-icon__clock" @click="readonly?null:open" style="cursor:pointer;"/>
            <input type="text" class="time" ref="timeInput" :value="value"
                   @focus="open">
        </div>
        <div class="timepicker" tabindex="0"
             :class="{'is-open': isOpen}"
             ref="timepicker">
            <div class="timepicker__header d-flex justify-space-between">
                設定時間
                <span class=" d-flex justify-end">
                    <v-icon style="color:white;font-size:20px;" @click.stop="close(true)">close</v-icon>
                    <v-icon style="color:lawngreen;font-size:20px;" @click.stop="close(false)" :disabled="readonly">done</v-icon>
                </span>
            </div>

            <div class="timepicker__time">
                <div class="flex-wrap">
                    <time-unit :value="time[0]" index="0"></time-unit>
                    <time-unit :value="time[1]" index="1"></time-unit>
                    <div class="timepicker__separator">:</div>
                    <time-unit :value="time[2]" index="2"></time-unit>
                    <time-unit :value="time[3]" index="3"></time-unit>
                    <active-background></active-background>
                </div>
            </div>
            <numpad></numpad>
        </div>
    </div>
</template>

<script>
    import store from './store';
    import { filteredDigits } from './helpers';

    import KeyboardEvents from './mixins/KeyboardEvents';
    import CommonActions from './mixins/CommonActions';
    import ActiveBackground from './components/ActiveBackground';
    import TimeUnit from './components/TimeUnit';
    import Numpad from './components/Numpad';

    export default {
        name: 'Timepicker',
        props: ['value', 'readonly'],
        mixins: [KeyboardEvents, CommonActions],
        components: {
            ActiveBackground,
            TimeUnit,
            Numpad
        },
        data() {
            return {
                time: null,
                isOpen: false
            };
        },
        created() {

            this.time = this.value.replace(':', '').split('');
            this.$on('close', this.close);

        },
        computed: {
            filteredDigits() {
                return filteredDigits(this.activeIndex, this.digits, this.time);
            },
            activeIndex: {
                get: function () { return store.activeIndex; },
                set: function (val) { store.activeIndex = val; }
            },
            myOpen: {
                get: function () { return store.isOpen; },
                set: function (val) { store.isOpen = val; }
            },
            myTimes: {
                get: function () { return store.time; },
                set: function (val) { store.time = val; }
            },
            digits: {
                get: function () { return store.digits; }
            },
            arrowKeys: {
                get: function () { return store.arrowKeys; }
            }
        },
        methods: {
            open() {
                if (document.querySelectorAll('.is-open').length > 0) {
                    return;
                }
                this.time = this.value.replace(':', '').split('');
                this.$refs.timeInput.blur();
                this.$refs.timepicker.focus();
                this.myOpen = this.isOpen = true;
                this.myTimes = this.time;
                this.activeIndex = 0;


            },
            close(cancel) {
                let isCancelled = cancel || false;

                if (!isCancelled) {
                    this.setTime();
                }
                this.$refs.timepicker.blur();
                this.myOpen = this.isOpen = false;
            },
            setTime() {
                this.$emit('input', `${this.time[0]}${this.time[1]}:${this.time[2]}${this.time[3]}`);
            }
        }
    };
</script>

<style lang="scss">
    $header-bg: #736db9;
    $time-bg: lighten($header-bg, 10%);
    $active-unit-bg: $header-bg;
    $digit-color: #757575;
    $border-radius: 3px;
    $input-width: 34px;
    $mobile-breakpoint: 480px;

    .timepicker-container {
        display: inline-block;
        position: none;

        @media (min-width: $mobile-breakpoint) {
            position:relative;
        }
    }

    .timepicker-wrap {
        display: inline-block;
        position: relative;
        *, *::after, *::before

    {
        box-sizing: border-box;
    }

    }

    .time {
        border: 1px solid rgba(0,0,0,0.1);
        padding: 15px 40px 15px 00px;
        border-radius: 3px;
        font-size: 1.2rem;
        width: 120px;
        text-align: center;
    }

    .flex-wrap {
        display: flex;
        position: relative;
    }

    .timepicker-icon {
        position: absolute;
        right: 15px;
        top: 50%;
        display: inline-block;
        width: 1em;
        height: 1em;
        stroke-width: 0;
        stroke: currentColor;
        fill: currentColor;
        transform: translate(0,-50%);
    }

    .timepicker {
        position: absolute;
        background: #FBFBFF;
        width: 100vw;
        height: 100vh;
        box-shadow: 0 3px 10px rgba(0,0,0,.3);
        border-radius: $border-radius;
        overflow: hidden;
        left: 50%;
        top: 0px;
        opacity: 0;
        transition: transform .2s .2s ease-in-out, opacity .2s .15s ease-in-out;
        transform: translate3d(-50%, 0, 0) scale(0.8);
        pointer-events: none;

        @media (min-width: $mobile-breakpoint) {
            width: 250px;
            border-radius: 0;
            top: 50px;
            left: 125%;
            height: auto;
        }

        &:before

    {
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 50%;
        transform: scale(0);
        transition: transform .2s ease-in-out;
    }

    &.is-open {
        opacity: 1;
        transform: translate3d(-50%, 0, 0) scale(1);
        pointer-events: auto;
        &:before

    {
        border-radius: $border-radius;
        transform: scale(1);
    }

    }

    &__header {
        padding: 5px 15px;
        font-size: 14px;
        color: #fff;
        background: $header-bg;
    }

    &__time {
        position: relative;
        overflow: hidden;
        background: $time-bg;
        display: flex;
        justify-content: center;
        font-size: 50px;
        color: #fff;
        line-height: 1;
        padding: 12px 10px;
    }

    &__active-bg {
        position: absolute;
        top: -25%;
        left: 0;
        width: $input-width;
        height: 200%;
        background: $active-unit-bg;
        transition: transform .4s ease;
    }

    &__separator {
        z-index: 2;
        position: relative;
        width: $input-width;
        text-align: center;
        font-size: 90%;
    }
    }
</style>
