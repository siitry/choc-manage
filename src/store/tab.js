import Cookie from "js-cookie"
export default {
  state: {
    menu: [],
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home"
      }
    ],
    isCollapse: false
  },
  mutations: {
    setMenu(state, val) {
      state.menu = val
      Cookie.set("menu", JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove("menu")
    },
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return
      }
      let menu = JSON.parse(Cookie.get("menu"))
      state.menu = menu
      let currentMenu = [
        {
          path: "/",
          component: () => import(`@/views/Main`),
          children: []
        }
      ]
      console.log(menu)
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      console.log(currentMenu, "cur")
      router.addRoutes(currentMenu)
    },
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ""
      } else {
        state.currentMenu = null
      }
      //   val.name === "home"
      //     ? (state.currentMenu = null)
      //     : (state.currentMenu = val)
    },
    closeTab(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
