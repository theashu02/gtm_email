import { createSlice } from "@reduxjs/toolkit";

// Add types for dashboard and subDashboard for type safety
type SubDashboard = { id: string; name: string; [key: string]: unknown };
type Dashboard = {
  id: string;
  name: string;
  hasSubDashboards: boolean;
  subDashboards: SubDashboard[];
};

const initialState = {
  user: null,
  error: null,
  authScreen: "login",
  simulationsRun: 0,
  simulationLimit: 0,
  allowedDashboardRoutes: [] as string[],
  availableDashboards: [
    {
      id: "plannedVsActualRevenue",
      name: "Planned vs Actual Revenue",
      hasSubDashboards: false,
      subDashboards: [] as SubDashboard[]
    }
  ] as Dashboard[],
  currentDashboardIndex: 0,
  activeTab: "plannedVsActualRevenue",
  activeSubDashboard: null as string | null,
  subscriptionStatus: "free",
  planType: "trial",
  consultingAmount: 0,
  isTrialExpired: false,
  subscriptionPeriod: "monthly",          // <-- Added
  nextBillingDate: null as string | null, // <-- Added type
  subscriptionStartDate: null as string | null, // <-- Added
  subscriptionEndDate: null as string | null,   // <-- Added
  planLimits: {
    productsLimit: 1,
    productsAdded: 0,
    geosLimits: 1,
    geosAdded: 0,
    industriesLimits: 1,
    industriesAdded: 0,
    aiFetchesLimit: 5,
    aiFetchAdded: 0,
    simulationsLimit: 2,
    simulationsAdded: 0,
    emailCampaignsLimit: 0,
    emailCampaignsAdded: 0,
    consultingHours: 0
  },

  // NEW: email connection state
  emailConnection: {
    connected: false,
    provider: "none", // 'gmail' | 'smtp' | 'none'
    profileEmail: null, // gmail profile email if any
    senderEmail: null,  // effective "From" address to show in UI
    smtp: {
      host: "",
      port: 0,
      secure: false,
      username: "",
      // password is never stored in Redux
      defaultFrom: ""
    },
    lastVerified: null
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      if (action.payload) {
        state.subscriptionStatus = action.payload.subscriptionStatus || "free";
        state.planType = action.payload.planType || "trial";
        state.planLimits = action.payload.planLimits || initialState.planLimits;
      }
      // hydrate emailConnection from user payload if available
      const ec = action.payload?.emailConnections;
      if (ec) {
        state.emailConnection.connected = !!ec.connected;
        state.emailConnection.provider = ec.provider || "none";
        state.emailConnection.profileEmail = ec.gmail?.profileEmail || null;
        state.emailConnection.senderEmail = ec.smtp?.defaultFrom || ec.gmail?.profileEmail || null;
        state.emailConnection.smtp = {
          host: ec.smtp?.host || "",
          port: ec.smtp?.port || 0,
          secure: !!ec.smtp?.secure,
          username: ec.smtp?.username || "",
          defaultFrom: ec.smtp?.defaultFrom || ""
        };
        state.emailConnection.lastVerified = ec.lastVerified || null;
      }
    },
    setLoginError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.subscriptionStatus = "free";
      state.planType = "trial";
      state.planLimits = initialState.planLimits;
      state.emailConnection = { ...initialState.emailConnection };
    },
    setAuthScreen: (state, action) => {
      state.authScreen = action.payload;
    },
    setAllowedDashboardRoutes(state, action) {
      state.allowedDashboardRoutes = action.payload;
    },
    setCurrentDashboardIndex: (state, action) => {
      state.currentDashboardIndex = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      const selectedDashboard = state.availableDashboards.find(
        dashboard => dashboard.id === action.payload
      );
      if (selectedDashboard?.hasSubDashboards && selectedDashboard.subDashboards.length > 0) {
        state.activeSubDashboard = selectedDashboard.subDashboards[0].id;
      } else {
        state.activeSubDashboard = null;
      }
    },
    setActiveSubDashboard: (state, action) => {
      state.activeSubDashboard = action.payload;
    },
    addDashboard: (state, action) => {
      state.availableDashboards.push(action.payload);
    },
    updateDashboard: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.availableDashboards.findIndex(dashboard => dashboard.id === id);
      if (index !== -1) {
        state.availableDashboards[index] = { ...state.availableDashboards[index], ...updates };
      }
    },
    removeDashboard: (state, action) => {
      const id = action.payload;
      state.availableDashboards = state.availableDashboards.filter(dashboard => dashboard.id !== id);
    },
    setSimulationRun: (state, action) => {
      state.simulationsRun = action.payload;
    },
    incrementSimulationsRun: (state) => {
      state.simulationsRun += 1;
      state.planLimits.simulationsAdded += 1;
    },
    setSimulationDetails: (state, action) => {
      state.simulationLimit = action.payload.simulationLimit;
      state.simulationsRun = action.payload.simulationsRun;
      state.subscriptionStatus = action.payload.subscriptionStatus;
      state.planType = action.payload.planType;
      state.planLimits = action.payload.planLimits;
      state.consultingAmount = action.payload.consultingAmount;
      state.isTrialExpired = action.payload.isTrialExpired;
    },
    updateSubscription: (state, action) => {
      state.subscriptionStatus = action.payload.status;
      state.planType = action.payload.planType;
      state.planLimits = action.payload.planLimits;
      state.consultingAmount = action.payload.consultingAmount;
    },
    updateConsultingAmount: (state, action) => {
      state.consultingAmount = action.payload;
    },
    decrementConsultingAmount: (state, action) => {
      const amountToDecrement = action.payload;
      state.consultingAmount = (state.consultingAmount - amountToDecrement);
    },
    incrementProductCount: (state) => {
      state.planLimits.productsAdded += 1;
    },
    decrementProductCount: (state) => {
      state.planLimits.productsAdded = Math.max(0, state.planLimits.productsAdded - 1);
    },
    incrementGeoCount: (state) => {
      state.planLimits.geosAdded += 1;
    },
    decrementGeoCount: (state) => {
      state.planLimits.geosAdded = Math.max(0, state.planLimits.geosAdded - 1);
    },
    incrementIndustryCount: (state) => {
      state.planLimits.industriesAdded += 1;
    },
    decrementIndustryCount: (state) => {
      state.planLimits.industriesAdded = Math.max(0, state.planLimits.industriesAdded - 1);
    },
    incrementAiFetchCount: (state) => {
      state.planLimits.aiFetchAdded += 1;
    },
    incrementSimulationCount: (state) => {
      state.planLimits.simulationsAdded += 1;
    },
    resetUsageCounts: (state) => {
      state.planLimits.productsAdded = 0;
      state.planLimits.geosAdded = 0;
      state.planLimits.industriesAdded = 0;
      state.planLimits.aiFetchAdded = 0;
      state.planLimits.simulationsAdded = 0;
    },
    setPlanLimits: (state, action) => {
      state.planLimits = { ...(state.planLimits || {}), ...(action.payload || {}) };
    },
    setSubscriptionDetails: (state, action) => {
      const {
        planType,
        subscriptionPeriod,
        createdAt,
        status,
        cancelledAt,
      } = action.payload;

      state.planType = planType;
      state.subscriptionPeriod = subscriptionPeriod;
      state.subscriptionStartDate = createdAt;
      state.subscriptionStatus = status;
      state.subscriptionEndDate = cancelledAt;

      if (createdAt && subscriptionPeriod) {
        const startDate = new Date(createdAt);
        const nextBillingDate = new Date(startDate);

        if (subscriptionPeriod === 'yearly') {
          nextBillingDate.setFullYear(startDate.getFullYear() + 1);
        } else if (subscriptionPeriod === 'monthly') {
          nextBillingDate.setMonth(startDate.getMonth() + 1);
        }
        nextBillingDate.setDate(startDate.getDate());
        state.nextBillingDate = nextBillingDate.toISOString();
      } else {
        state.nextBillingDate = null;
      }
    },

    // -------------------- NEW email-related reducers --------------------

    setEmailConnection: (state, action) => {
      const payload = action.payload || {};
      state.emailConnection.connected = !!payload.connected;
      state.emailConnection.provider = payload.provider || "none";
      state.emailConnection.profileEmail = payload.profileEmail || null;
      state.emailConnection.senderEmail = payload.senderEmail || payload.profileEmail || null;
      state.emailConnection.smtp = {
        host: payload.smtp?.host || "",
        port: payload.smtp?.port || 0,
        secure: !!payload.smtp?.secure,
        username: payload.smtp?.username || "",
        defaultFrom: payload.smtp?.defaultFrom || ""
      };
      state.emailConnection.lastVerified = payload.lastVerified || null;
    },

    clearEmailConnection: (state) => {
      state.emailConnection = { ...initialState.emailConnection };
    },

    setSenderEmail: (state, action) => {
      state.emailConnection.senderEmail = action.payload || null;
    },

    setSmtpFields: (state, action) => {
      const s = action.payload || {};
      state.emailConnection.smtp.host = s.host || state.emailConnection.smtp.host;
      state.emailConnection.smtp.port = s.port || state.emailConnection.smtp.port;
      state.emailConnection.smtp.secure = typeof s.secure === "boolean" ? s.secure : state.emailConnection.smtp.secure;
      state.emailConnection.smtp.username = s.username || state.emailConnection.smtp.username;
      state.emailConnection.smtp.defaultFrom = s.defaultFrom || state.emailConnection.smtp.defaultFrom;
      state.emailConnection.senderEmail = s.defaultFrom || state.emailConnection.senderEmail;
      if (s.host) {
        state.emailConnection.connected = true;
        state.emailConnection.provider = "smtp";
      }
    },
  },
});

export const {
  setUser,
  setLoginError,
  clearUser,
  setAuthScreen,
  setSimulationRun,
  setAllowedDashboardRoutes,
  setCurrentDashboardIndex,
  decrementConsultingAmount,
  updateConsultingAmount,
  setActiveTab,
  setActiveSubDashboard,
  addDashboard,
  updateDashboard,
  removeDashboard,
  incrementSimulationsRun,
  setSimulationDetails,
  updateSubscription,
  incrementProductCount,
  decrementProductCount,
  incrementGeoCount,
  decrementGeoCount,
  incrementIndustryCount,
  decrementIndustryCount,
  incrementAiFetchCount,
  incrementSimulationCount,
  resetUsageCounts,
  setPlanLimits,
  setSubscriptionDetails,
  setEmailConnection,
  clearEmailConnection,
  setSenderEmail,
  setSmtpFields,
} = userSlice.actions;

export default userSlice.reducer;