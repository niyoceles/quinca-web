import React from 'react';
import Profile from '../../components/supplier/Profile';
import ClientLayout from '../../layouts/ClientLayout';
import { Container } from '../../components/Ui/Layout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import { UserCircle } from 'lucide-react';

const MyProfile = () => {
  return (
    <ClientLayout>
      <main className="min-h-screen bg-slate-50/50 pb-24 pt-12">
        <Container>
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-primary/10 p-4 rounded-3xl text-primary">
              <UserCircle size={32} />
            </div>
            <div>
              <Typography variant="h2">My <span className="text-primary italic">Account</span></Typography>
              <p className="text-slate-400 font-medium">Manage your personal information and account settings.</p>
            </div>
          </div>

          <Card className="border-none shadow-premium bg-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-5xl mx-auto">
              <Profile />
            </div>
          </Card>
        </Container>
      </main>
    </ClientLayout>
  );
};

export default MyProfile;
