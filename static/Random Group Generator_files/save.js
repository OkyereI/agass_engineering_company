// JavaScript Document
activityRoot="https://www.classtools.net/random-group-generator/"
silentsave=0;
authorType="new";
loadedData="";
saveOrEdit="save";
premiumUserName="NONE"

function finishSave(p,d)
{
correctPW=p;
	//Send to save.php.
					$.ajax({ url: 'save.php',
					 data: {
							content:p+"\n*****\n"+d
							},
					dataType: 'json',
					type: 'post',
					async:false,
					success: function(data) 
						{
						document.reloader.action=activityRoot+data.theURL;
						document.reloader.pw.value=correctPW;
						$("#savedBoxNAME").html("<h3>Successfully saved!</h3><br>Your template will now be loaded at this unique address:<p><input style='width:90%;padding:0.5em;text-align:center;font-size:0.7em' type='text' value='"+activityRoot+data.theURL+"'><p><br>Be sure to make a note of it!")
						$("#savedBoxOK").html("<p><input type='button' class='but' value='OK' onClick='javascript:document.reloader.submit()' /></p>");
						reposit()
						$("#savedBox").show();	
						}
					});	
}

function saveit(dataToSave)
{
//Is it new (authorType=="new")?
	//YES > 
	if(authorType=="new")
		{
		if(premiumUserName!=""){finishSave(premiumUserPW,dataToSave);return}
		//Ask for a new password.
		apprise("<span align='center'>Provide a password<br>(so you can edit this later):</span>",
			{'input':true}, 
			function(pw) 
				{
				if(pw==false){apprise("A password must be provided");return}
				finishSave(pw,dataToSave)
				}
		);
		}

	//NO > 
		//	Are we dealing with an 'author viewer' already? (authorType=="administrator")
		if(authorType=="administrator")
			{
			//YES > Resave and give a message.	
				$.ajax({ url: 'save.php',
				 data: {
						content:correctPW+"\n*****\n"+dataToSave,
						folder: theFolder,
						file: theFile
						},
				dataType: 'json',
				type: 'post',
				async:false,
				success: function(data) 
					{
					if(silentsave!=1)
					//RESAVED to = http://www.classtools.net/brainybox/"+data.theURL
						{
						new Noty({
					   type: 'success',layout: 'bottomLeft',theme: 'nest',text: "Successfully resaved!",
					   timeout: '4000',progressBar: true, closeWith: ['click'],killer: true,}).show();
						/*$("#savedBoxNAME").html("<h3>Successfully resaved!</h3>")
						$("#savedBoxOK").html("<p><input type='button' class='but' value='OK' onClick='javascript:$(\"#savedBox\").hide()' /></p>");
						reposit()
						$("#savedBox").show();	*/
						}
					silentsave=0
					return true;
					}
				});
			}	
			//NO (i.e. authorType=="viewExisting") > 
			if(authorType=="viewExisting")
				{
				if(createdByThisPremiumUser==1)
					{
					checkpw("","save")
					}
				//IF NOT, Ask for the password for this template.
				else{
					if(createdByPremiumUser==1){apprise("This template was created by a ClassTools premium user.<br>If it belongs to you, login at the top of the screen to edit it.");return}
					
					apprise("The unlock the template at this URL, please provide the password:",
						{'input':true}, 
						function(pw) 
							{
							//CheckPW using Ajax.
							checkpw(pw,"save");	
							}
						);}
				}
}

function checkpw(pw,func)
{
$.ajax({ url: 'pwcheck.php',
					 data: {
							pw:pw,
							folder: theFolder,
							file: theFile,
						 	premiumUser:premiumUser,
						 	premiumUserName:premiumUserName,
						 	createdByThisPremiumUser:createdByThisPremiumUser
							},
					dataType: 'json',
					type: 'post',
					async:false,
					success: function(data) 
						{
						//If incorrect, give error message and return
						if(data.theMess=="failure")
							{apprise("Incorrect password");return;}
						else
							{
							correctPW=pw
							if(createdByThisPremiumUser==1){correctPW=data.pw}
							authorType="administrator";
							//If correct, give success message.
							if(saveOrEdit=="save"){save();}
							if(saveOrEdit=="edit"){init()}	
								
							/*apprise("Correct!",{'animate':true},
							function(r)
								{
								if(saveOrEdit=="save"){save();}
								if(saveOrEdit=="edit")
									{
									init()
									}
								}
							);	*/
							}
						}
					});
}