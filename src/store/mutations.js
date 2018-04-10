const mutations = {
  setFormulaTags (state, formulas) {
    state.formulaTagsCache = formulas
  },
  setMaterialTags (state, material) {
    state.materialTagsCache = material
  },
  setLinks (state, links) {
    state.linksCache = links
  },
  setCoopers (state, coopers) {
    state.cooperCache = coopers
  },
  setMessages (state, messages) {
    state.messages = messages
  },
  setUnReadMsg (state, messages) {
    state.unReadMsg = messages
  }
}
export default mutations
