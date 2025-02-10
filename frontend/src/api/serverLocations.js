export const backendServerLocation = 'https://localhost:444'
const frontendServerLocation = 'https://localhost'

export const buildStaticUrl = (file) => { // Points to frontend server location
    return frontendServerLocation + '/static/' + file
}