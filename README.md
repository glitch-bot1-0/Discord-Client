# Discord-Client
This is a console client, written in [Node.js](http://nodejs.org), with which allows you to connect to Discord via a WebHook and a bot or your user account.
#### Note
To create WebHooks you must have the permissions to **manage webhooks** or use a hook of another person. If you wanted to use a bot to see the messages you have received, you need too the permissions to **manage servers** that you can add the bot to the server. An alternate to this is to use the token of your account to listen for new messages.
But this is a security risk, because if anyone else can see your account token, he/she/it can do everything with your account.
## Requirements
* Node.js [v6.0.0](https://nodejs.org/download/release/v6.0.0/) or highter
* [ECMAScript edition 6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015)
* node and npm added to PATH (it is by default)
* circa 10 MB of disc storage :)
## Installation
Just download the files and run **npm install** in the downloaded folder. If it won't work, try to install the packages manually with **npm install [packetname]**. You can find all required packages in the [package.json](https://github.com/glitch-bot1-0/Discord-Client/blob/master/package.json) file.
## Configuration
I haven't made a config.json file, because there's not very much to configure. The client can be started 'normal' only with **node index**. Then it'll ask for the token. If you have a bot token or want to use your account token (**localStorage.token**) just paste it into the command line. If you only press enter it won't start the logger so you can't see, what the other people are writting.
After the token it'll ask again for the url of the WebHook. This must be set. If you just press enter, it will return an error and exit with [error code](https://github.com/nodejs/node-v0.x-archive/blob/master/doc/api/process.markdown#exit-codes) 1.
If you not always want to paste the token and the hook's url, you can create a shortcut to do this.
Check the table for valid parameters.
<table>
	<thead>
		<tr>
			<th>Parameter</th>
			<th>Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>-token</td>
			<td>the token from your discord account or a bot</td>
		</tr>
		<tr>
			<td>-payload</td>
			<td>the url of the WebHook from discord</td>
		</tr>
		<tr>
			<td>-username</td>
			<td>the name of the bot user, which send the messages</td>
		</tr>
		<tr>
			<td>-logger</td>
			<td>set it if you want to open a seperate window for the received messages</td>
		</tr>
		<tr>
			<td>-monitor</td>
			<td>identify the current progress as message monitor; only show received messages</td>
		</tr>
	</tbody>
</table>
