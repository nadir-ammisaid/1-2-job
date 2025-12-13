import { Github, Linkedin, Mail } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t bg-white">
      <div className="container mx-auto px-4 py-12 md:px-36">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">1, 2, Job</h3>
            <p className="text-sm text-gray-600">
              The simplest platform to find your dream job. Connect with top
              companies and kickstart your career today.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="/home"
                  className="transition-colors hover:text-blue-600"
                >
                  Browse Jobs
                </a>
              </li>
              <li>
                <a
                  href="/my-applications"
                  className="transition-colors hover:text-blue-600"
                >
                  My Applications
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="transition-colors hover:text-blue-600"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              For Companies
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="/home"
                  className="transition-colors hover:text-blue-600"
                >
                  Post a Job
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="transition-colors hover:text-blue-600"
                >
                  Company Profile
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="transition-colors hover:text-blue-600"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="/home"
                  className="transition-colors hover:text-blue-600"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="transition-colors hover:text-blue-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="transition-colors hover:text-blue-600"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
            <p>&copy; {currentYear} 1, 2, Job. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/nadir-ammisaid/1-2-job"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-600"
                title="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://linkedin.com/in/nadir-ammisaid/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-600"
                title="Connect on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="mailto:nadir.ammisaid@outlook.com"
                className="transition-colors hover:text-blue-600"
                title="Send an email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
