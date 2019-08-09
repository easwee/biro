<script>
  import Editor from "./Editor.svelte";
  import { isSidebarOpened } from "store";

  function setSidebarOpened() {
    isSidebarOpened.update(state => {
      return !state;
    });
  }
</script>

<style>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #e6e6e6;
    overflow-x: hidden;
    transition: 0.5s;
  }

  .sidenav .content {
    padding: 15px;
  }

  .sidenav .content a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav .content a:hover {
    color: #737070;
  }

  .sidenav .content .closebtn {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 36px;
    margin-left: 50px;
  }

  .open {
    width: 250px;
  }
</style>

<div class="sidenav" class:open={$isSidebarOpened}>
  <div class="content">
    <a href="javascript:void(0)" class="closebtn" on:click={setSidebarOpened}>
      &times;
    </a>
    <Editor />
  </div>
</div>
