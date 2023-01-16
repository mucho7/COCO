function SigninForm(params) {
    return (
        <form>
            <label>아이디</label>
            <input type="text"></input>

            <label>비밀번호</label>
            <input type="password"></input>

            <label>비밀번호 확인</label>
            <input type="password"></input>

            <label>이메일</label>
            <input type="email"></input>

            <button className="submit"> 가입 하라우 </button>
        </form>
    )
}

export default SigninForm