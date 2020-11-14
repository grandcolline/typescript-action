import * as core from '@actions/core';
const {GitHub, context} = require('@actions/github');

export async function notice(body: string) {
	try {
		 // get information on everything
		 const token = core.getInput('token')
		 const github = new GitHub(token, {} )
		 console.log( context )
		 const PR_number = context.payload.pull_request.number

		 if ( context.payload.pull_request.body.indexOf( body ) < 0  ) {
			core.setFailed("The body of the PR does not contain " + body);
			console.log( "Actor " + context.actor + " pr number " + PR_number)
			const result = await github.issues.createComment({
				owner: context.actor,
				repo: context.payload.repository.full_name,
				issue_number: PR_number,
				body: "We need to have the word " + body + " in the body of the pull request"
			});
			console.log(result)
		} // more irrelevant stuff below
	}
	finally{
		 console.log( ":+1:" )
	}
}
