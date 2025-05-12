using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace WebAPI.Infrastructure.Providers;

public class FirebaseProvider
{
    public FirebaseProvider()
    {
        var x = FirebaseApp.Create(new AppOptions
        {
            Credential = GoogleCredential.FromFile("./firebase.json")
        });
    }

}