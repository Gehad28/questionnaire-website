import { useRef } from "react";
import Header from "./Components/Header";
import RegistrationForm from "./Components/RegistrationForm";

export default function HomePage(){
    const registrationFormRef = useRef<HTMLDivElement>(null);

    const scrollToRegistration = () => {
        registrationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <>
        <Header onButtonClick={scrollToRegistration}></Header>
        <div ref={registrationFormRef}>
            <RegistrationForm></RegistrationForm>
        </div>
        </>
    );
}