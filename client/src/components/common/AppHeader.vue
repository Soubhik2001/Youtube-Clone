<template>
  <div class="header">
    <!-- Logo -->
    <router-link to="/home" class="logo">
      <img
        src="../../assets/download.png"
        alt="YouTube Logo"
      />
    </router-link>

    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" placeholder="Search"/>
      <button> <v-icon style="color: rgb(160, 158, 158); font-size: 24px;">fas fa-search</v-icon>
</button>
    </div>

    <!-- Navigation Links -->
    <!-- <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/trending">Trending</router-link>
      <router-link to="/subscriptions">Subscriptions</router-link>
    </div> -->

    <!-- User Profile (You can customize this part) -->
    <div class="user-profile">
      <router-link to="/">
        <button><v-icon :icon="`mdiSvg:${mdiAccount}`"></v-icon></button>
      </router-link>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
/* Add your styling for the header here */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 100px;
  height: 80px;
}

.search-bar {
  flex: 0.5;
  margin: 0 20px;
  display: flex;
  align-items: center;
  border-radius: 40px 0 0 40px;
}

.search-bar input {
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 500px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  background-color: #e2dfdf;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}


.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 8px;
}

.user-profile a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>

<script></script>
