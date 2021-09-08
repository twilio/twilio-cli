Name:           twilio
Version:        2.27.1
Release:        1%{?dist}
Summary:        A CLI for Twilio
BuildArch:      x86_64
Buildroot:      %{_tmppath}/%{name}-%{version}-root

License:        MIT
#URL:           https://github.com/twilio/twilio-cli
Source:        %{name}-v%{version}.tar.gz

#BuildRequires:
Requires:       bash

# Disable Fedora's shebang mangling script,
# which errors out on any file with versionless `python` in its shebang
# See: https://github.com/atom/atom/issues/21937
%undefine __brp_mangle_shebangs


%description
The Twilio CLI allows you to manage your Twilio resources from your terminal or command prompt.
Head over to https://www.twilio.com/docs/twilio-cli/quickstart.

%prep
%setup -q -n %{name}

%build

%install
rm -rf %{buildroot}/%{name}-%{version}
mkdir -p %{buildroot}/usr/local/lib/%{name}
mkdir -p %{buildroot}/usr/local/bin
cp -a $RPM_BUILD_DIR/%{name}/* %{buildroot}/usr/local/lib/%{name}
cd %{buildroot}
ln -sf /usr/local/lib/twilio/bin/twilio /usr/local/bin/twilio

%clean
rm -rf %{buildroot}/%{name}-%{version}
rm -rf $RPM_BUILD_DIR

%files
%defattr(-,root,root,-)
%license LICENSE
%doc README.md
%{_prefix}

%changelog