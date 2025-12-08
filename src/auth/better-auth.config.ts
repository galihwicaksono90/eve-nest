import { env } from '@/utils/config';
import { betterAuth, BetterAuthPlugin } from 'better-auth';
import { admin, bearer, defaultRoles, openAPI } from 'better-auth/plugins';
import { ac, stylist } from './permissions';
import { Pool } from 'pg';
import { EmailService } from '@/shared/email/email.service';
import { v4 as uuid } from 'uuid';

type GetConfig = {
  emailService: EmailService;
};

export function getConfig({ emailService }: GetConfig) {
  // Core plugins
  const plugins: BetterAuthPlugin[] = [
    admin({
      ac,
      roles: {
        ...defaultRoles,
        stylist,
      },
    }),
    bearer(),
  ];

  // Plugins for development only
  const nonProdPlugins = [openAPI()];
  if (env.NODE_ENV !== 'production') {
    plugins.push(...nonProdPlugins);
  }

  return betterAuth({
    database: new Pool({
      connectionString: env.DATABASE_URL,
    }),
    account: {
      modelName: 'accounts',
    },
    session: {
      modelName: 'sessions',
    },
    verification: {
      modelName: 'verifications',
    },
    user: {
      modelName: 'users',
      fields: {
        name: 'firstName',
      },
      additionalFields: {
        lastName: {
          type: 'string',
          input: true,
          defaultValue: '',
          returned: true,
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      autoSignIn: false,
      sendResetPassword: async ({ url, user }) => {
        await emailService.sendResetPassword({ url, email: user.email });
      },
      onPasswordReset: async ({ user }) => {
        // TODO: implement on password reset
        console.log(`Password for user ${user.email} has been reset.`);
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ url, user }) => {
        await emailService.sendVerificationEmail({ url, email: user.email });
      },
    },
    advanced: {
      database: {
        generateId: () => uuid(),
      },
      cookiePrefix: 'TmVzdEpTIEJvaWxlcnBsYXRl',
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    plugins,
    trustedOrigins: ['https://example.com'],
  });
}

export type Auth = ReturnType<typeof getConfig>;
