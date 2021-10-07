import { setStoredCities, setStoredOption } from "../utils/storage"

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOption({
    tempScale: 'metric'
  })
})
