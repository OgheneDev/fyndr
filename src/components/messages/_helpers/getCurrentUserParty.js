const getCurrentUserParty = (chatInfo, userType) => {
  if (!chatInfo) return null
  return userType === 'merchant' ? chatInfo.merchant : chatInfo.user
}

export default getCurrentUserParty
