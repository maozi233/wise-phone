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
  }
}
export default mutations
