-- student of all class with subject name
select * from student st
join class c on st.cid = c.cid;
 
 select st.sid, st.full_name, c.cid, c.class_name from student st
 join class c on st.cid = c.cid
 join teacherclasssubject tcs on tcs.cid = st.cid;
 
 select st.sid, st.full_name, c.cid, sub.sub_id, sub.sub_name
 from student st 
 join class c on st.Cid = c.Cid 
 join teacherclasssubject tcs on tcs.cid = c.cid 
 join subject sub on tcs.sub_id = sub.sub_id
 where st.sid = 2110;
 
 
 -- exam result of all subjects for one student
 select er.Sid, st.full_name, e.exam_id, sub.sub_id, sub.sub_name, er.score from examresult er 
 join exam e on er.exam_id = e.exam_id
 join subject sub on e.sub_id = sub.sub_id
 join student st on st.sid = er.sid
 where er.Sid = 2110;
 
 -- all student and teacher of class
 select t.Tid, tcs from teacherclasssubject tcs
 join teacher t on tcs.Tid = t.Tid
 join student s on tcs.Cid = s.cid
 where tcs.cid = 1001;
 
 select count(DISTINCT Tid), count(DISTINCT sub_id) from class c
 join teacherclasssubject tcs on c.Cid = tcs.Cid
 where c.cid = 1003;

 select * from class c
 join teacherclasssubject tcs on c.Cid = tcs.Cid
 where c.cid = 1005;
 
 select c.cid, tcs.tid, s.sid, s.full_name from class c
 join teacherclasssubject tcs on c.Cid = tcs.Cid
 join student s on tcs.cid = s.cid
 where c.cid = 1001;
 
 
 