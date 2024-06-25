import React from 'react';
import Button from '../Button';
import Input from '../Input';
import { Link } from 'react-router-dom';

import googleIcon from '../../assets/google-icon.svg';
import githubIcon from '../../assets/github-icon.svg';

import { BottomLink, SocialSection, StyledForm } from './styles';



interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formFields: {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
  socialButtons?: boolean;
  bottomLink?: "signup" | "signin";
  width?: string;
}

function AuthForm({ title, buttonText, onSubmit, formFields, socialButtons, bottomLink, width }: AuthFormProps) {
  return (
    <>
      <StyledForm onSubmit={onSubmit} width={width}>
        <h2>{title}</h2>
        {formFields.map((field, index) => (
          <Input key={index} {...field} />
        ))}

        <Button type="submit" variant='neutral'>{buttonText}</Button>
      </StyledForm>

      {socialButtons && (
        <SocialSection width={width}>
          <div className='separator'>
            <div></div>
            <span>Or</span>
            <div></div>
          </div>

          <div className='buttons'>
            <Button className='btnGoogle' variant='transparent' icon={<SocialButtonIcon icon='google' />}>
              Sign in with Google
            </Button>
            <Button className='btnGithub' variant='transparent' icon={<SocialButtonIcon icon='github' />}>
              Sign in with Github
            </Button>
          </div>
        </SocialSection>
      )}

      {
        bottomLink && (
          <BottomLink>
            {bottomLink === 'signup' ? (
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            ) : (
              <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            )}
          </BottomLink>
        )
      }
    </>
  );
}

export default AuthForm;

interface SocialButtonIconProps {
  icon: string;
}

function SocialButtonIcon({ icon }: SocialButtonIconProps) {
  return (
    icon === 'google' ? (
      <img src={googleIcon} alt="Google" />
    ) : (
      <img src={githubIcon} alt="Github" />
    )
  );
}