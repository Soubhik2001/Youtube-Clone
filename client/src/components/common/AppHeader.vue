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
      <input v-model="searchQuery" type="text" placeholder="Search" />
      <button @click="search">
        <i class="fas fa-search" style="color: #606060; font-size: 20px"></i>
      </button>
    </div>

    <!-- <div class="nav-links"></div> -->

    <div class="nav-links">
      <router-link to="/home">
        <i class="fas fa-house" style="color: #606060; font-size: 20px"></i>
      </router-link>
      <router-link to="/channel"
        ><i
          class="fas fa-tv"
          style="font-size: 20px"
          @click="openCreateChannelDialog"
        ></i
      ></router-link>
      <router-link to="/notification">
        <!-- <v-badge dot color="error"> -->
          <i class="fas fa-bell" style="font-size: 20px; color: #606060"></i>
        <!-- </v-badge> -->
      </router-link>
      <router-link to="/profile">
        <i class="fas fa-user" style="color: #606060; font-size: 20px"></i>
      </router-link>
      <router-link to="/">
        <i
          class="fas fa-sign-out-alt"
          style="color: #606060; font-size: 20px"
          @click="logout"
        ></i>
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
        <router-link to="/myChannel">
          <li class="sidebar-item">
            <i class="fas fa-film" style="color: #333; font-size: 20px"></i>
            My Channels
          </li>
        </router-link>
        <router-link to="/subscriptions">
          <li class="sidebar-item">
            <i class="fas fa-rss" style="color: #333; font-size: 20px"></i>
            Subscriptions
          </li>
        </router-link>
        <router-link to="/likedVideos">
          <li class="sidebar-item">
            <i
              class="fas fa-thumbs-up"
              style="color: #333; font-size: 20px"
            ></i>
            Liked Videos
          </li>
        </router-link>
        <hr />
        <router-link to="/exploreVideos">
          <li class="sidebar-item">
            <i class="fas fa-compass" style="color: #333; font-size: 20px"></i>
            Explore
          </li>
        </router-link>
        <router-link to="/trendingVideos">
          <li class="sidebar-item">
            <i class="fas fa-fire" style="color: #333; font-size: 20px"></i>
            Trending
          </li>
        </router-link>
        <hr />
        <router-link to="#">
          <li class="sidebar-item">
            <i class="fas fa-cog" style="color: #333; font-size: 20px"></i>
            Settings
          </li>
        </router-link>
        <router-link to="#">
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

    <!-- Small Sidebar -->
    <div class="icons-sidebar" :class="{ open: isIconsSidebarOpen }">
      <!-- Sidebar Content -->
      <ul>
        <router-link
          to="/home"
          @mouseover="showCaption('Home')"
          @mouseout="hideCaption"
        >
          <li class="icons-sidebar-item">
            <i class="fas fa-home" style="color: #333; font-size: 20px"></i>
            <span class="caption" v-if="caption === 'Home'">{{ caption }}</span>
          </li>
        </router-link>
        <router-link
          to="/myChannel"
          @mouseover="showCaption('My Channels')"
          @mouseout="hideCaption"
        >
          <li class="sidebar-item">
            <i class="fas fa-film" style="color: #333; font-size: 20px"></i>
            <span class="caption" v-if="caption === 'My Channels'">{{
              caption
            }}</span>
          </li>
        </router-link>
        <router-link
          to="/subscriptions"
          @mouseover="showCaption('Subscriptions')"
          @mouseout="hideCaption"
        >
          <li class="icons-sidebar-item">
            <i class="fas fa-rss" style="color: #333; font-size: 20px"></i>
            <span class="caption" v-if="caption === 'Subscriptions'">{{
              caption
            }}</span>
          </li>
        </router-link>
        <router-link
          to="/likedVideos"
          @mouseover="showCaption('Liked Videos')"
          @mouseout="hideCaption"
        >
          <li class="icons-sidebar-item">
            <i
              class="fas fa-thumbs-up"
              style="color: #333; font-size: 20px"
            ></i>
            <span class="caption" v-if="caption === 'Liked Videos'">{{
              caption
            }}</span>
          </li>
        </router-link>
        <router-link
          to="/exploreVideos"
          @mouseover="showCaption('Explore')"
          @mouseout="hideCaption"
        >
          <li class="icons-sidebar-item">
            <i class="fas fa-compass" style="color: #333; font-size: 20px"></i>
            <span class="caption" v-if="caption === 'Explore'">{{
              caption
            }}</span>
          </li>
        </router-link>
        <router-link
          to="/trendingVideos"
          @mouseover="showCaption('Trending')"
          @mouseout="hideCaption"
        >
          <li class="icons-sidebar-item">
            <i class="fas fa-fire" style="color: #333; font-size: 20px"></i>
            <span class="caption" v-if="caption === 'Trending'">{{
              caption
            }}</span>
          </li>
        </router-link>
        <router-link
          to="#"
          @mouseover="showCaption('Settings')"
          @mouseout="hideCaption"
        >
          <li class="icons-sidebar-item">
            <i class="fas fa-cog" style="color: #333; font-size: 20px"></i>
            <span class="caption" v-if="caption === 'Settings'">{{
              caption
            }}</span>
          </li>
        </router-link>
        <router-link
          to="#"
          @mouseover="showCaption('About')"
          @mouseout="hideCaption"
        >
          <li class="icons-sidebar-item">
            <i
              class="fas fa-info-circle"
              style="color: #333; font-size: 20px"
            ></i>
            <span class="caption" v-if="caption === 'About'">{{
              caption
            }}</span>
          </li>
        </router-link>
        <!-- <div class="caption" v-if="caption">{{ caption }}</div> -->
      </ul>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axiosInstance";

export default {
  data() {
    return {
      isSidebarOpen: false,
      isIconsSidebarOpen: true,
      caption: null,
      searchQuery: "",
    };
  },
  methods: {
    async search() {
      try {
        const videoResults = await axiosInstance.post(
          `http://localhost:3000/searchbar/searchVideos?searchItem=${this.searchQuery}`
        );
        const channelResults = await axiosInstance.post(
          `http://localhost:3000/searchbar/searchChannels?searchItem=${this.searchQuery}`
        );
        // this.$router.push({
        //   name: "search-results",
        //   query: {
        //     videoResults: JSON.stringify(videoResults.data.results),
        //     channelResults: JSON.stringify(channelResults.data.results),
        //   },
        // });
        this.$store.commit("setVideoResults", videoResults.data.results);
        this.$store.commit("setChannelResults", channelResults.data.results);

        this.$router.push({ name: "search-results" });
        this.$toast.open({
        message: "Results found",
        type: "success",
      });
        // console.log(videoResults);
        // console.log(channelResults);
      } catch (error) {
        console.log(error);
        this.$toast.open({
        message: "No results found",
        type: "error",
      });
      }
    },
    toggleSidebar() {
      this.isIconsSidebarOpen = !this.isIconsSidebarOpen;
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openCreateChannelDialog() {
      this.$emit("open-create-channel-dialog");
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$toast.open({
            message: "Logged out successfully",
            type: "success",
          });
    },
    showCaption(caption) {
      this.caption = caption;
    },
    hideCaption() {
      this.caption = null;
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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

.sidebar i {
  font-size: 20px;
}
.sidebar-item:hover {
  /* background-color: #dad5d5; */
  cursor: pointer;
}
.sidebar hr {
  border-top: 1px solid #dad5d5;
  margin: 20px 20px;
}

.icons-sidebar {
  width: 50px;
  height: 100%;
  position: fixed;
  top: 90px;
  left: -250px;
  background-color: #fff;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.icons-sidebar.open {
  left: 0;
}

.icons-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.icons-sidebar li {
  margin: 40px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icons-sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 16px;
}

.icons-sidebar i {
  font-size: 20px;
}
.icons-sidebar-item:hover {
  /* background-color: #dad5d5; */
  cursor: pointer;
}
.icons-sidebar hr {
  border-top: 1px solid #dad5d5;
  margin: 20px 20px;
}

.caption {
  position: absolute;
  font-size: 12px;
  background-color: #ccc;
  padding: 4px 8px;
  left: 50px;
  border-radius: 4px;
  pointer-events: none;
  display: none;
}

.icons-sidebar:hover .caption {
  display: block;
}
</style>
