## 什么是JDBC

JDBC: **Java DataBase Connectivity**

JDBC是 Java对SQL数据库的连接驱动程序，是所有其他数据库查询库的基础。

Hibernate, MyBatis等查询库，都是对JDBC的封装，最后查询时底层都是调用JDBC的

##. 用JDBC查询

**球员的Java类**

```java
    public  class Player {
        private int id;
        private String name;
        private int teamId;
        private int number;
        private int height;

        @Override
        public String toString() {
            return "Player [id=" + id + ", name=" + name + ", teamId=" + teamId
                    + ", number=" + number + ", height=" + height + "]";
        }

        // Getters/Setters
        // ...
    }
```

**查询代码**

```java

public class PlayerDAO {

    public List<Player> findTallerPlayers() throws SQLException {
        // 1. Get connection
        Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/nba", "root", "");

        // 2. Prepare the query
        PreparedStatement stmt = con.prepareStatement(
                " SELECT p.*"
                + " from player as p, team as t "
                + " where p.teamId = t.id "
                + " and p.height >= ?"
                + " and t.name like ?");

        // 3. Set query parameters
        stmt.setInt(1, 198);
        stmt.setString(2, "%Lakers");
 
        // 4. Execute the query
        ResultSet rs = stmt.executeQuery();

        // 5. Traverse the ResultSet to get results
        List<Player> players = new ArrayList<Player>();
        while (rs.next()) {
            Player p = new Player();
            
            // 6. Get each column
            int id = rs.getInt("id");
            String name = rs.getString("name");
            int number = rs.getInt("number");
            int height = rs.getInt("height");
            int teamId = rs.getInt("teamId");

            // 7. fill in the model object
            p.setId(id);
            p.setName(name);
            p.setNumber(number);
            p.setHeight(height);
            p.setTeamId(teamId);
            players.add(p);
        }
        return players;
    }

    public static void main(String[] args) throws SQLException {
        PlayerDAO dao = new PlayerDAO();
        for (Player p : dao.findTallerPlayers()) {
            System.out.println(p);
        }
    }
}
```

##. 输出：

```
    Player [id=1, name=Kobe Bryant, teamId=1, number=24, height=201]
    Player [id=2, name=Pau Gasol, teamId=1, number=16, height=216]
    Player [id=3, name=Metta World Peace, teamId=1, number=15, height=203]
```

##. JDBC的优缺点

###. 优点：

1. 简单
1. 和SQL最接近
1. 速度快

###. 缺点:

1. 代码较繁琐
1. 对面向对象支持不好，需要手动填充对象
1. 因为直接写原生SQL, 移植性较差
1. 对事务的支持太简单，只有一个commit()操作