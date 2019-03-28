const signinForm = `
<div>
    <input type="email" class="-input-height -input-marginTop" name="email" id="email" placeholder ="example@live.com" required/>
</div>
<div>
    <input type="password"  class="-input-height -input-marginTop" name="password" id="password" placeholder ="Password" required/>
</div>
                                        
<div>
    <center>
        <button class="signinBox__button button -small -orangeredBgColor -whiteTxtColor" id="loginBtn" onclick ='signin(event)'>Submit</button>
        <div class="signinBox__button-with-border -redTxtColor -fs-medium"id="loginBtn">Forgot password ?</div>
                                                    
    </center>
</div>
`;

export default signinForm;
