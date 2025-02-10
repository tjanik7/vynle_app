export const backendServerLocation = 'https://api.vynle.com'
const frontendServerLocation = 'https://vynle.com'

export const buildStaticUrl = (file) => { // Points to frontend server location
    return frontendServerLocation + '/static/' + file
}