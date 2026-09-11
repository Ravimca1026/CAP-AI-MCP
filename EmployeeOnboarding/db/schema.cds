namespace com.onboarding;

entity OnboardingRequests {
  key ID              : UUID    @Core.Computed;
  employeeName        : String(100)   not null;
  employeeEmail       : String(100)   not null;
  department          : String enum { HR; IT; Sales; Finance; Operations; } not null;
  role                : String(100)   not null;
  startDate           : Date          not null;
  laptopRequired      : Boolean       default false;
  accessCardRequired  : Boolean       default false;
  remarks             : String(500);
  status              : String        default 'PENDING';
  createdAt           : Timestamp     @cds.on.insert : $now;
}