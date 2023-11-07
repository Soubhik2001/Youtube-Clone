<template>
  <router-view/>
</template>

<script>
import socketioService from './services/socketio.service';

export default {
  created(){
    socketioService.setupSocketConnection();
  },
  beforeDestroy(){
    const socket = socketioService.getSocket();
    if(socket){
      socket.disconnect();
    }
  }
}
</script>

<style>
</style>

