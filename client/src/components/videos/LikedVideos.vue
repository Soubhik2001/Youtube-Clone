<template>
    <app-header></app-header>
  <v-container class="main">
    <v-row>
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="video-card"
          :class="{ 'card-hover': isHovered === index }"
          @mouseover="isHovered = index"
          @mouseout="isHovered = null"
        >
          <v-img
            :src="card.thumbnail"
            aspect-ratio="16/9"
            height="200"
            class="image"
          ></v-img>
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.views }} views</v-card-subtitle>
          <div class="video-details">
            <div class="duration">{{ card.duration }}</div>
            <div class="channel-info">
              <v-img
                :src="card.profile"
                height="30"
                width="30"
                style="border-radius: 15px"
              ></v-img>
              <div class="channel-name">{{ card.channelName }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppHeader from "../common/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      cards: [
        {
          thumbnail:
            "https://i.ytimg.com/vi/6TYkDy54q4E/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBWCIWtkNOQuG_8cs42HbQygXoCTA",
          duration: "11:11",
          profile:
            "https://yt3.googleusercontent.com/UlKrbeZ4Xz79DUbEbF3FvC0FQ4A_cvpIIzhJQ_wigP8CL_Xf_WF-ryYrrtGpqpD9WzAplsUz=s176-c-k-c0x00ffffff-no-rj",
          title: "ImNotGoodEnough.js",
          channelName: "Hyperplexed",
          views: "637k",
          time: "1 year",
        },
        {
          thumbnail:
            "https://i.ytimg.com/vi/rioc6mTWOZs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJiTR6fmKJU7LmK2o1lfq5F7PXEw",
          duration: "24:26",
          profile:
            "https://yt3.googleusercontent.com/tWGVfHXn5SaAsw-7livA-p-Db6VrWKtLESCqIaR0Gw6cMN47dhUWt3nMPYcoF7ueZBDsUq4atg=s176-c-k-c0x00ffffff-no-rj",
          title: "Photoshopping YOUR Drawings! | Realistified! S1E3",
          channelName: "Benny Productions",
          views: "11M",
          time: "2 years",
        },
        {
          thumbnail:
            "https://i.ytimg.com/vi/-QgJgZCJvo4/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB_2KVRoB69h4VCTsgcCODnftemTA",
          duration: "37:45",
          profile:
            "https://yt3.googleusercontent.com/ytc/AOPolaS101j27Disa_BYArytv-hXMRl8wNMtqZMTkrfH=s176-c-k-c0x00ffffff-no-rj",
          title: "I Challenged The CSS King To A CSS Battle",
          channelName: "Web Dev Simplified",
          views: "1.2M",
          time: "2 years",
        },
        {
          thumbnail:
            "https://i.ytimg.com/vi/pY-kr8DgnWk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDfnmE-lFvJm6jPhcTdJz6-fIe95A",
          duration: "15:01",
          profile:
            "https://yt3.googleusercontent.com/okRlBwXJN68DuPhHs_AaMlOHVwfnHWEL7is5lV3RTyYlJSDvOy58-q-OyCm5bSOU71csOHyaKQ=s176-c-k-c0x00ffffff-no-rj",
          title: "VFX Artists React to Bad & Great CGi 9",
          channelName: "Corridor Crew",
          views: "6.7M",
          time: "3 years",
        },
        {
          thumbnail:
            "https://i.ytimg.com/vi/YjYsjyu7TIY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBNLuOheAZSFFZQUDo_vSFpvga2vg",
          duration: "4:39",
          profile:
            "https://yt3.googleusercontent.com/ytc/AOPolaRbWvcPuAZMiqeKn637mEoXt2qZg-z1Aic6mFg=s176-c-k-c0x00ffffff-no-rj",
          title:
            "Wednesday Playing Cello Theme | Paint It Black - The Rolling Stones (Episode 1 Soundtrack Netflix)",
          channelName: "Krutikov Music",
          views: "5.8M",
          time: "8 months",
        },
      ],
      isHovered: null,
    };
  },
};
</script>

<style scoped>
.main{
  padding-left:100px;
  padding-top:100px;
}
.image {
  padding: 2px;
}

.video-card {
  background: #f1f1f1;
  border-radius: 15px;
  padding: 10px 10px;
  transition: transform 0.5s ease-in-out;
}

.card-hover {
  transform: scale(1.05);
}

.video-details {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.duration {
  color: #9a9a9a;
  font-size: 0.8rem;
}

.channel-info {
  display: flex;
  align-items: center;
}

.channel-name {
  color: #9a9a9a;
  font-size: 0.8rem;
  margin-left: 5px;
}
</style>
