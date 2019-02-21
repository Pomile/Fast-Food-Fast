const formContent = `
<h2 class="-orangeredTxtColor">Create account</h2>
<div>
    <input  class="-input-height -input-marginTop" type="text" name="firstname" id="firstname" placeholder ="Firstname" required/>
</div>
<div>
    <input  class="-input-height -input-marginTop" type="text"  name="lastname" id="lastname" placeholder ="Lastname" required/>
</div>
<div>
    <input  class="-input-height -input-marginTop" type="email"  name="email" id="email" placeholder ="example@live.com" required/>
</div>
<div>
        <input  class="-input-height -input-marginTop" type="tel"  name="phone" id="phone" placeholder ="09078282126" required/>
</div>
<div>
    <input  class="-input-height -input-marginTop" type="password"  name="password" id="password" placeholder ="Password" required/>
</div>
<div>
    <input  class="-input-height -input-marginTop" type="password"  name="cofirmpassword" id="confirmpassword" placeholder ="confirmpassword" required/>
</div>
<div>
    <button  class="signupBox__button button -small -orangeredBgColor -whiteTxtColor -flip-right"id="createAccountBtn" onclick ='signup(event)'>Submit</button>
</div>
`;

export default formContent;
