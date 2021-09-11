<template>
  <div>
    <head>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>

    </head>
    <router-view></router-view>
   </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  }
  html, body{
    /* padding-left: calc(50vw - 750px); To be used for content
      padding-right: calc(50vw - 750px); */
    overflow-x: hidden;
    margin: 0 !important;
    padding: 0 !important;
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
    -webkit-scroll-behavior: smooth;
  }
  body{
    overflow-x: hidden;
    margin: 0;
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
  }
  button{
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none;
  }
</style>
