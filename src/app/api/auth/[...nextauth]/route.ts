import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

console.log('GITHUB_CLIENT_ID', process.env.GITHUB_CLIENT_ID)
console.log(process.env.GITHUB_CLIENT_SECRET)
console.log(process.env.GOOGLE_CLIENT_ID)
console.log('GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID ?? '',
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
		})
	]
})

export { handler as GET, handler as POST }
