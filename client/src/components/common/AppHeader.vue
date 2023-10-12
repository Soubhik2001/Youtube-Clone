<template>
  <div class="header">
    <!-- Hamburger Menu Button -->
    <button class="hamburger-button" @click="toggleSidebar">
      <i class="fas fa-bars" style="color: #606060; font-size: 20px"></i>
    </button>

    <router-link to="/home" class="logo">
      <img src="../../assets/Youtube-logo.jpg" alt="YouTube Logo" />
    </router-link>

    <div class="search-bar">
      <input type="text" placeholder="Search" />
      <button>
        <i class="fas fa-search" style="color: #606060; font-size: 20px"></i>
      </button>
    </div>

    <!-- <div class="nav-links"></div> -->

    <div class="nav-links">
      <router-link to="/home">
        <i class="fas fa-house" style="color: #606060; font-size: 20px"></i>
      </router-link>
      <router-link to="/channel"
        ><i class="fas fa-tv" style="font-size: 20px" @click="openCreateChannelDialog"></i
      ></router-link>
      <router-link to="#"
        ><i class="fas fa-bell" style="font-size: 20px"></i
      ></router-link>
      <router-link to="/profile">
        <i class="fas fa-user" style="color: #606060; font-size: 20px"></i>
      </router-link>
      <router-link to="/">
        <i class="fas fa-sign-out-alt" style="color: #606060; font-size: 20px" @click="logout"></i>
      </router-link>
    </div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <!-- Sidebar Content -->
      <ul>
        <router-link to="/home">
          <li class="sidebar-item">
            <i class="fas fa-home" style="color: #333; font-size: 20px"></i>
            Home
          </li>
        </router-link>
        <router-link to="/subscriptions">
          <li class="sidebar-item">
            <i class="fas fa-rss" style="color: #333; font-size: 20px"></i>
            Subscriptions
          </li>
        </router-link>
        <router-link to="likedVideos">
          <li class="sidebar-item">
            <i class="fas fa-thumbs-up" style="color: #333; font-size: 20px"></i>
            Liked Videos
          </li>
        </router-link>
        <hr>
        <router-link to="/#">
          <li class="sidebar-item">
            <i class="fas fa-compass" style="color: #333; font-size: 20px"></i>
            Explore
          </li>
        </router-link>
        <router-link to="/#">
          <li class="sidebar-item">
            <i class="fas fa-fire" style="color: #333; font-size: 20px"></i>
            Trending
          </li>
        </router-link>
        <hr>
        <router-link to="/#">
          <li class="sidebar-item">
            <i class="fas fa-cog" style="color: #333; font-size: 20px"></i>
            Settings
          </li>
        </router-link>
        <router-link to="/#">
          <li class="sidebar-item">
            <i
              class="fas fa-info-circle"
              style="color: #333; font-size: 20px"
            ></i>
            About
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openCreateChannelDialog(){
      this.$emit('open-create-channel-dialog');
    },
  },
};
</script>

<style scoped>
.header {
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 90px;
  height: auto;
}

.search-bar {
  flex: 0.6;
  margin: 0 20px;
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 24px;
  padding: 4px 12px;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 6px 12px;
  font-size: 16px;
}

.search-bar button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #606060;
  font-weight: bold;
  font-size: 16px;
}

.user-profile a {
  text-decoration: none;
  color: #606060;
  font-weight: bold;
  font-size: 16px;
}

.hamburger-button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin-right: 10px;
}

.sidebar {
  width: 170px;
  height: 100%;
  position: fixed;
  top: 90px;
  left: -250px;
  background-color: #fff;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.sidebar.open {
  left: 0;
}

/* Sidebar Link Styles */
.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 40px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 16px;
}

/* Sidebar Icon Styles */
.sidebar i {
  font-size: 20px;
}
.sidebar-item:hover {
  background-color: #dad5d5;
  cursor: pointer;
}
.sidebar hr {
  border-top: 1px solid #dad5d5;
  margin: 20px 20px;
}

</style>
