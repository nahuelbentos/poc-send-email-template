
require('dotenv').config();
const nodemailer = require('nodemailer');

const makeHtmlTemplate = () => {
  const descripcion = 'Pago completado';
  const websiteUrl = process.env.WEBSITE_URL; 

  const getInfo = () => {
    const info = [
      {name: 'Nro. Socio', value: 12231414123},
      {name: 'Cuotas pagas', value: 'cuota 5 A4083250, cuota 6 A4124033, cuota 7'},
      {name: 'Total', value: '$ 3360'},
    ];

    return info.map(
      ({name, value}) => `<p style="font-size: 16px; color:#414140; margin-bottom:22px; font-family: arial;">
      <b>${name}:</b> ${value}
    </p>
    `
    ).join('');
  };

  return `
  <html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>ACU</title>
		<style type="text/css">
			a {
				color: #0b54aa;
				font-size: 16px;
				font-weight: normal;
			}
			body, #header h1, #header h2, p {
				margin: 0;
				padding: 0;
			}
			#main {
				border: 0px;
			}
			img {
				display: block;
			}
			#top-message p, #bottom-message p {
				color: #3f4042;
				font-size: 12px;
				font-family: Arial, Helvetica, sans-serif;
			}
			#header h1 {
				color: #ffffff !important;
				font-family: "Arial",  sans-serif;
				font-size: 48px;
				margin-bottom: 0 !important;
				padding-bottom: 0;
				font-weight: bold;text-transform: uppercase;margin-right:10px;margin-top:45px;
			}
			#header p {
				color: #ffffff !important;
				font-family:  "Arial", sans-serif;
				font-size: 12px;
			}
			h1, h2, h3, h4, h5, h6 {
				margin: 0 0 0.8em 0;
			}
			p {
				font-family:  "Arial", sans-serif;
				font-size:16px;
				color:#414140;
				font-weight: normal;
			}
		</style>

		<link rel="icon" type="image/png" href="${websiteUrl}packages/assets/website/images/favicon-16x16.png" />
		<link rel="apple-touch-icon" sizes="57x57" href="${websiteUrl}packages/assets/website/images/favicon-57x57.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="${websiteUrl}packages/assets/website/images/favicon-114x114.png" />
	</head>

	<body>

		<table width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
			<tr>
				<td>
				<table id="main" width="600" align="center" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<table id="header" cellpadding="0" cellspacing="0" align="center">
								<tr>
									<td width="600" height="230">
										<img width="600" height="230" style="display:block;"
											src="http://acu.com.uy/wp-content/themes/weblizar/images/email_pagos/email_cabezal.jpg" />
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr>
						<td>
							<table id="header" cellpadding="40" cellspacing="0" align="center">
								<tr>
									<td width="600" colspan="0">
										<p style="font-size: 32px; font-weight: bold; color: #fa2200 !important;">
											${descripcion || 'Pagos online'} 
										</p>
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr>
						<td>
							<table id="content-2" cellpadding="40" cellspacing="0" align="center">
								<tr>
									<td width="600" style="padding-top: 20px !important;">
										<h3 style="font-weight: bold; font-size: 18px; color:#414140; margin-bottom:20px; font-family: arial;">
											Información
										</h3>
                    ${getInfo()}
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr>
						<td>
							<table id="content-2" cellpadding="40" cellspacing="0" align="center">
								<tr>
									<td width="600" style="padding-top: 20px !important;">&nbsp;</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr>
						<td>
							<table id="header" cellpadding="0" cellspacing="0" align="center">
								<tr>
									<td width="600" height="127">
										<img width="600" height="127" style="display:block;"
											src="http://acu.com.uy/wp-content/themes/weblizar/images/email_pagos/email_footer.jpg" />
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</tr>
		</table>
	</body>
</html>
  `;
};


// Setp 1
let transporter = nodemailer.createTransport({
  host: process.env.HOST, 
  port: process.env.PORT, 
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

// Step2
let mailOptions = {
  from: process.env.FROM_EMAIL, 
  to: process.env.TO_EMAIL, 
  subject: 'Testing email - POC',
  html: makeHtmlTemplate()
}

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
  if(err){
    console.log('error occurs', err);
  }else{
    console.log(data);
    console.log('Email sent!!');
  }

})