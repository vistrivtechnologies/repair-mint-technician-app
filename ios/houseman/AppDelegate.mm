#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (NSString *)moduleName {
  return @"houseman";
}

- (NSDictionary *)initialProps {
  return @{};
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [GMSServices provideAPIKey:@"AIzaSyD2IZNv1mMW3vkvFosW3EdCGgp8_9zTc30"];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// 💥 THIS is what you missed:
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
