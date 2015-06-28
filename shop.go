package main


import (
"log"
"flag"
"fmt"
	"os"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/fogcreek/logging"
	"github.com/googollee/go-socket.io"
	//"github.com/garyburd/redigo/redis"
	"github.com/soveran/redisurl"
)

var dbredis = initDb()

var (
	redisAddress   = flag.String("redis-address", "redis://localhost:6379", "Address to the Redis server")
	maxConnections = flag.Int("max-connections", 10, "Max connections to Redis")
)

func initDb() (c redis.Conn) {
    rp, err := redisurl.ConnectToURL(*redisAddress)
    if err != nil {
	fmt.Println(err)
        os.Exit(1)
    }
    //defer rp.Close()
    return rp
}

func SetupSocketIO() (*socketio.Server, error) {
	server, err := socketio.NewServer(nil)
	if err != nil {
		return nil, err
	}

	server.On("connection", func(so socketio.Socket) {
		logging.InfoWithTags([]string{"socket.io"}, "New socket.io connection:", so.Id())
		//so.Join("feedbag")
		so.On("disconnection", func() {
			// no op
		})
	})
	server.On("error", func(so socketio.Socket, err error) {
		logging.ErrorWithTags([]string{"socket.io"}, "Error on socket.io server", err.Error())
	})
	
	server.On("checkout", func(msg string) {
		logging.InfoWithTags([]string{"socket.io"}, "New socket.io connection ups i did it again:", msg)
            log.Println("emit:", msg)
        })
			
	

	return server, nil
}

func index (c *gin.Context) {
	content := gin.H{"Hello":"World"}
	c.JSON(200, content)
}

func main() {
	r := gin.Default()

	// if Allow DirectoryIndex
	r.Use(static.Serve("/request/", static.LocalFile("./app", true)))
	r.Use(static.Serve("/todo/", static.LocalFile("./todo", true)))

	
	// set prefix
	r.Use(static.Serve("/static", static.LocalFile("./app", true)))
	r.Use(static.Serve("/static", static.LocalFile("./todo", true)))


	r.GET("/ping", func(c *gin.Context) {
		c.String(200, "test")
	})
	r.GET("/index", index, index)

	// Setup Socket.io server and related activity fetching
	socketServer, err := SetupSocketIO()
	if err != nil {
	    logging.ErrorWithTags([]string{"socket.io"}, "Error on socket.io server", err.Error())

	}

        r.GET("/socket.io/", func(c *gin.Context) {
		socketServer.ServeHTTP(c.Writer, c.Request)
	})
	// redis configuration
	flag.Parse()



	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")

}
