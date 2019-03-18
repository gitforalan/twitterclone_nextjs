from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import mysite.routing

application = ProtocolTypeRouter({
  "websocket": AuthMiddlewareStack(
    URLRouter(
      mysite.routing.websocket_urlpatterns,
    )
  )
})