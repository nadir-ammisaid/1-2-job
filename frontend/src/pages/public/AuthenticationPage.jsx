import Header from "../../components/layout/Header";
import SignInUpForm from "../../components/auth/SignInUpForm";

function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} showHomeButton={false} />
      <SignInUpForm />
    </div>
  );
}

export default AuthenticationPage;
