<i18n>
  {
    "zh": {
      "dataSourceToggle": {
        "title": "需要登录",
        "loginNotice": "查看个人掉落数据前，请先登录",
        "all": "全平台",
        "personal": "个人"
      }
    },
    "en": {
      "dataSourceToggle": {
        "title": "Login Required",
        "loginNotice": "Please log in before viewing personal drop data.",
        "all": "All",
        "personal": "Personal"
      }
    },
    "ja": {
      "dataSourceToggle": {
        "title": "ログインが必要です",
        "loginNotice": "個人のドロップデータを表示するにはログインが必要となります。",
        "all": "全体",
        "personal": "個人"
      }
    }
  }
</i18n>

<template>
  <span>
    <v-dialog
      v-model="prefetchingResources"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{ $t('meta.loading') }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('dataSourceToggle.title') }}
        </v-card-title>
        <v-card-text>
          {{ $t('dataSourceToggle.loginNotice') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <AccountManager @afterLogin="afterLogin" />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn-toggle
      v-model="dataSource"
      borderless
      class="data-source-switch"
    >
      <v-btn
        small
        value="global"
      >
        {{ $t('dataSourceToggle.all') }}
      </v-btn>
      <v-btn
        small
        value="personal"
      >
        {{ $t('dataSourceToggle.personal') }}
      </v-btn>
    </v-btn-toggle>
  </span>
</template>

<script>
import AccountManager from "@/components/toolbar/AccountManager";
export default {
  name: "DataSourceToggle",
  components: {
    AccountManager
  },
  data() {
    return {
      dialog: false,
      prefetchingResources: false,
      dataSourceId: null
    };
  },
  computed: {
    dataSource: {
      get() {
        return this.$store.state.dataSource;
      },
      async set(value) {
        switch (value) {
          case "global":
            break;
          case "personal":
            // refresh personal data
            if (!this.$store.getters.authed) {
              // please login
              this.dialog = true;
              return;
            }
            // fetch data
            this.$store.dispatch("refreshPersonalMatrixData");
            // change data source after fetch data
            break;
        }
        this.$store.commit("switchDataSource", value);
      }
    }
  },
  methods: {
    afterLogin() {
      this.dialog = false;
      this.dataSource = "personal";
    }
  }
};
</script>

<style scoped>
  .theme--light.data-source-switch {
    border: 1px solid rgba(0, 0, 0, .8);
  }
  .theme--dark.data-source-switch {
    border: 1px solid rgba(255, 255, 255, .6);
  }
</style>