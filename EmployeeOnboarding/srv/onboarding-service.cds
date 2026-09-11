using com.onboarding as db from '../db/schema';
@path: 'onboarding'
service OnboardingService {
   @odata.draft.enabled
  entity OnboardingRequests as projection on db.OnboardingRequests;
}