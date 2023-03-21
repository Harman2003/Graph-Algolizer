const JavaCode=`public static class Solution {
        static class Pair {
            int val;
            int weight;

            Pair(int val, int weight) {
                this.val = val;
                this.weight = weight;
            }

        }

        public void dfs(int src, ArrayList<ArrayList<Pair>> adj, boolean[] vis) {

            /*src*/
            //this command for visiting the node->preOrder

            vis[src] = true;
            for (Pair des : adj.get(src)) {
                if (!vis[des.val]) {
                    dfs(des.val, adj, vis);

                    /*src*/
                    //this command to show travelling back to that node -> Inorder
                }
            }

            /**src**/  
            //this commmand to finally backtrack ->postOrder 
        }

        public void solve(int n, ArrayList<ArrayList<Integer>> graph) {
            ArrayList<ArrayList<Pair>> adj = new ArrayList<>();
            boolean[] vis = new boolean[n];
            for (int i = 0; i < n; i++) {
                adj.add(new ArrayList<>());
            }
            for (ArrayList<Integer> temp : graph) {
                int src = temp.get(0);
                int des = temp.get(1);
                int weight = temp.get(2);
                adj.get(src).add(new Pair(des, weight));
                adj.get(des).add(new Pair(src, weight));
            }
           
            //source node is zero here
            dfs(0, adj, vis);
        }
    }`

export default JavaCode;