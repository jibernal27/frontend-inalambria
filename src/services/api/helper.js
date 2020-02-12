export const parseError = response => {
  return { success: false, error: response.error }
}
