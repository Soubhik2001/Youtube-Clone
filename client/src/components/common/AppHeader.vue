<template>
  <div class="header">
    <!-- Hamburger Menu Button -->
    <button class="hamburger-button" @click="toggleSidebar">
      <i class="fas fa-bars" style="color: #606060; font-size: 20px;"></i>
    </button>

    <router-link to="/home" class="logo">
      <img src="../../assets/Youtube-logo.jpg" alt="YouTube Logo" />
    </router-link>

    <div class="search-bar">
      <input type="text" placeholder="Search" />
      <button>
        <i class="fas fa-search" style="color: #606060; font-size: 20px;"></i>
      </button>
    </div>

    <div class="nav-links">
      <router-link to="/home">Home</router-link>
      <router-link to="/trending">Trending</router-link>
      <router-link to="/subscriptions">Subscriptions</router-link>
    </div>

    <div class="user-profile">
      <router-link to="/">
        <i class="fas fa-user" style="color: #606060; font-size: 20px;"></i>
      </router-link>
    </div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'open': isSidebarOpen }">
      <!-- Sidebar Content -->
      <ul>
        <router-link to="/home">
          <li>
            <i class="fas fa-home" style="color: #333; font-size: 20px;"></i>
            Home
          </li>
        </router-link>
        <router-link to="/explore">
          <li>
            <i class="fas fa-compass" style="color: #333; font-size: 20px;"></i>
            Explore
          </li>
        </router-link>
        <router-link to="/subscriptions">
          <li>
            <i class="fas fa-rss" style="color: #333; font-size: 20px;"></i>
            Subscriptions
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
  },
};
</script>

<style scoped>
.header {
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
  width: 200px;
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
</style>
