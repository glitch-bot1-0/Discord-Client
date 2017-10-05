const Discord		= require('discord.js');
const readline		= require('readline');
const request		= require('request');
const child_process	= require('child_process');
const fs			= require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// calculated Bot invite Link: https://discordapp.com/oauth2/authorize?client_id={BotID}&scope=bot&permissions=2146958591

if(process.argv.includes('-monitor') && process.argv.includes('-token')){
	var token = process.argv[process.argv.indexOf('-token') + 1],
	client = new Discord.Client()
	.on('ready', () => {
		console.log(((process.argv.includes('-logger')) ? '\n' : '' ) + Date().split(' ')[4] + ' - Nachrichtenlogger online' + ((process.argv.includes('-logger')) ? '' : '!					      ║'));
	})
	.on('message', message => {
		if (process.argv.includes('-channel') && message.channel.id !== process.argv[process.argv.indexOf('-channel')]) return;
		console.log((!process.argv.includes('-logger')) ? 'Channel:     ' + message.channel.guild.name + ' >> ' + message.channel.name + ' [' + message.channel.id + ']\n ║ Benutzer:	' + message.author.username + ' [' + message.author.id + ']' + '\n ║ Nachricht:	' + message.content : '\n───────────────────────────────────────────────────────────────────────────────\n\n Channel    => ' + message.channel.guild.name + ' >> ' + message.channel.name + ' [' + message.channel.id + ']\n' + ' Benutzer   => ' + message.author.username + ' [' + message.author.id + ']' + '\n Nachricht  => ' + message.content);
		if(message.content.substr(0, 16).toLowerCase() === 'erstelle webhook'){
			message.channel.createWebhook(message.content.substr(17)).then(webhook => {
				message.author.send(`webhook wurde erstellt!\nURL: https://canary.discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`)
			}).catch(message.author.send)
		}
	})
	.login(token);
}else{
	(process.argv.includes('-token')) ? a(process.argv[process.argv.indexOf('-token') + 1]) : rl.question('Bot Token (falls verfügbar): ', a);

	function a(token){
		if (!token) return b();
		var monitor = child_process.exec(((process.argv.includes('-logger')) ? 'start ' : '') + 'node index -monitor ' + ((process.argv.includes('-logger')) ? '-logger' : '') + ' -token ' + token, function(error, stdout, stderr) {
			if (error !== null) return console.log('Monitor error: ' + error);
			console.log(stdout);
			console.log(stderr);
		});
		monitor.stdout.on('data', data => {
			console.log('\n\n ╔════ Logger ════════════════════════════════════════════════════════════════╗\n ║									      ║\n ║ ' + data.toString() + ' ║									      ║\n ╚════════════════════════════════════════════════════════════════════════════╝\n');
		})
		b();
	}

	function b() {
		(process.argv.includes('-payload')) ? c(process.argv[process.argv.indexOf('-payload') + 1]) : rl.question('WebHook URL: ', c);
		function c(url){
			console.log('\n\n ┌───────────────────────────────────────────────────────────────────────────┐\n │ Authentifizierung ...						     │\n │									     │ ');
			request(url, (error, response, body) => {
				if (error) {
					console.log(' │ WebHook nicht erreichbar:						     │\n │ ' + error + '\n └───────────────────────────────────────────────────────────────────────────┘\n');
					process.exit(1);
				}

				try{
					var hookData = JSON.parse(body);
				}catch(err){
					console.log(' │ WebHook ungültig!							     │\n │ Überprüfe die URL und versuche es erneut.				     │');
					console.log(' └───────────────────────────────────────────────────────────────────────────┘\n');
					process.exit(1);
				}

				var username = (process.argv.includes('-username')) ? process.argv[process.argv.indexOf('-username') + 1] : hookData.name;

				console.log(` │ Anmeldung erfolgreich!						     │\n │									     │ \n │ Benutzer:	${username}\n │ Channel:	${hookData.channel_id}					     │\n │ Avatar:	${hookData.avatar}			     │\n └───────────────────────────────────────────────────────────────────────────┘\n\n`);

				setTimeout(() => start(hookData), 3000);
			})
		}
	}
}

function start(hookData) {
	msg.call(hookData, new Discord.WebhookClient(hookData.id, hookData.token))
}

function evcmd() {
	rl.question('Eval: ', ans => {
		new Function(ans).call()
		start(this)
	})
}

function msg(webhook){
	rl.question('Nachricht: ', ans => {
		webhook.send(ans, {username: (process.argv.includes('-username')) ? process.argv[process.argv.indexOf('-username') + 1] : ''})
		.then(msg => console.log('senden erfolgreich!'))
		.catch(err => console.log(`senden fehlgeschlagen!\n${err}`));
		setTimeout(() => start(this), 500);
	})
}

function raw(webhook){
	rl.question('RAW-Nachricht: ', ans => {
		webhook.sendSlackMessage({
			'username': (process.argv.includes('-username')) ? process.argv[process.argv.indexOf('-username') + 1] : '',
			'attachments': [{
				'pretext': ans,
				'color': '#FF0000',
				'footer_icon': '',
				'footer': '',
				'ts': Date.now() / 1000
			}]
		}).catch(console.error);
	})
	setTimeout(() => start(this), 500)
}