<template>
  <div class="tracking">
    <div class="button-container" :class="{'button-container--started': running, 'button-container--stopped': !running}">
      <svg class="button-circle-container" viewBox="0 0 120 150" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="button-circle" cx="60" cy="60" r="55"  @click="onTouch"/>
        <text class="text" x="60" y="60" @click="onTouch">{{ buttonLabel }}</text>
        <!--<text class="text" x="60" y="135">{{ runningTime }}</text>-->
        <text class="text" x="20" y="135">{{ runningTime.hours }}</text>
        <text class="text" x="40" y="133">:</text>
        <text class="text" x="60" y="135">{{ runningTime.minutes }}</text>
        <text class="text" x="80" y="133">:</text>
        <text class="text" x="100" y="135">{{ runningTime.seconds }}</text>
      </svg>
    </div>
  </div>
</template>

<script>
import MocoApi from "../MocoApi";
import Utils from "../Utils";

export default {
  name: "tracking",
  data () {
    return {
      running: false,
      runningTimestamp: 0,
      runningTime: {
        hours: "00",
        minutes: "00",
        seconds: "00"
      },
      presences: [],
    };
  },
  computed: {
    buttonLabel: function () {
      return this.running ? "Stop" : "Start";
    }
  },
  methods: {
    async fetchData () {
      const response = await MocoApi.presences();

      const today = new Date().toISOString().split('T')[0];

      const presences = response.filter(presence => presence.date === today);

      this.running = undefined !== response.find(item => item.to === null);
      this.presences = presences;
      this.updateTime();

      window.setTimeout(this.fetchData, 60000)

    },
    async onTouch () {
      await MocoApi.touch();
      this.fetchData();
    },
    updateTime() {
      let runningTimestamp = Math.floor(this.presences.reduce((accumulator, current) => {
        const from = new Date(`${current.date}T${current.from}:00Z`);
        const now = new Date();
        let toString = `${current.date}T${Utils.formatTime(now)}Z`;
        if (null !== current.to) {
          toString = `${current.date}T${current.to}:00Z`;
        }

        const to = new Date(toString);

        return accumulator + (to - from);
      }, 0) / 1000);

      this.runningTime.hours = Utils.leadingZero(Math.floor(runningTimestamp / 3600));
      runningTimestamp %= 3600;

      this.runningTime.minutes = Utils.leadingZero(Math.floor(runningTimestamp / 60));
      runningTimestamp %= 60;

      this.runningTime.seconds = Utils.leadingZero(runningTimestamp);

      window.requestAnimationFrame(this.updateTime);
    }
  },
  mounted() {
    this.fetchData();
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.fetchData());
  }
};
</script>

<style scoped lang="stylus">
  @import "../styles/Tracking.styl"
</style>
