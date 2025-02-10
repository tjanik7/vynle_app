// TODO: toggle these based on config
export const backendServerLocation = process.env.NODE_ENV === 'production' ? 'https://api.vynle.com' : 'http://localhost:8000'
const frontendServerLocation = process.env.NODE_ENV === 'production' ? 'https://vynle.com' : 'http://localhost'

export const buildStaticUrl = (file) => { // Points to frontend server location
    return frontendServerLocation + '/static/' + file
}