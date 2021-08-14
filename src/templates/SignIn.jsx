import React, {useCallback, useState} from 'react';
import {PrimaryButton, TextInput} from '../components/UIkit';
import {signIn} from "../reducks/users/operations";
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router'

const SignIn = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
  [password, setPassword] = useState("");

  const inputEmail = useCallback(e => {
    setEmail(e.target.value)
  }, [setEmail]);
  const inputPassword = useCallback(e => {
    setPassword(e.target.value)
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput fullWidth={true} label={"メールアドレス"} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput fullWidth={true} label={"パスワード"} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div className="center">
        <PrimaryButton
          label={"Sign In"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <p onClick={() => dispatch(push('./signup'))}>アカウント登録はこちら</p>
        <p onClick={() => dispatch(push('./signin/reset'))}>パスワードを忘れた方はこちら</p>
      </div>
    </div>
  )
}

export default SignIn;